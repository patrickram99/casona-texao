#!/bin/bash
set -e

echo "=== Casona Texao - Deployment Script ==="
echo ""

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
  echo "Please run with sudo: sudo bash scripts/deploy.sh"
  exit 1
fi

# 1. Add swap if less than 2GB RAM (needed for Docker builds on small VMs)
TOTAL_RAM=$(free -m | awk '/^Mem:/{print $2}')
if [ "$TOTAL_RAM" -lt 2000 ] && [ ! -f /swapfile ]; then
  echo ">> Adding 2GB swap (small VM detected: ${TOTAL_RAM}MB RAM)..."
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo ">> Swap enabled."
fi

# 2. Install Docker if not present
if ! command -v docker &> /dev/null; then
  echo ">> Installing Docker..."
  apt-get update
  apt-get install -y ca-certificates curl gnupg
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  apt-get update
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
  echo ">> Docker installed."
else
  echo ">> Docker already installed."
fi

# 3. Check for .env file
if [ ! -f .env.production ]; then
  echo "ERROR: .env.production not found."
  echo "Create it: cp .env.production.example .env.production && nano .env.production"
  exit 1
fi

# 4. Generate secrets if still placeholder (using openssl, no Node needed)
if grep -q "CHANGE_ME" .env.production; then
  echo ">> Generating production secrets..."
  gen() { openssl rand -base64 16; }

  sed -i "s|APP_KEYS=CHANGE_ME_1,CHANGE_ME_2,CHANGE_ME_3,CHANGE_ME_4|APP_KEYS=$(gen),$(gen),$(gen),$(gen)|" .env.production
  sed -i "s|API_TOKEN_SALT=CHANGE_ME|API_TOKEN_SALT=$(gen)|" .env.production
  sed -i "s|ADMIN_JWT_SECRET=CHANGE_ME|ADMIN_JWT_SECRET=$(gen)|" .env.production
  sed -i "s|TRANSFER_TOKEN_SALT=CHANGE_ME|TRANSFER_TOKEN_SALT=$(gen)|" .env.production
  sed -i "s|JWT_SECRET=CHANGE_ME|JWT_SECRET=$(gen)|" .env.production

  echo ">> Secrets generated."
fi

# 5. Copy production env
cp .env.production .env

# 6. Build and start
echo ">> Building containers (this takes a few minutes on first run)..."
docker compose build
docker compose up -d

echo ""
echo "=== Deployment complete! ==="
DOMAIN=$(grep "^DOMAIN=" .env.production | cut -d= -f2)
echo ""
echo "  Site:   https://$DOMAIN"
echo "  Admin:  https://$DOMAIN/admin"
echo ""
echo "Next steps:"
echo "  1. Create admin user at https://$DOMAIN/admin"
echo "  2. Seed data:  docker compose exec cms npm run seed:example"
echo ""
echo "Commands:"
echo "  docker compose logs -f        # View logs"
echo "  docker compose up -d --build  # Rebuild after code changes"
echo "  docker compose down           # Stop everything"
