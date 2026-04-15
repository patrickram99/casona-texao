import { getGlobalConfig } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const globalConfig = await getGlobalConfig().catch(() => null);
	return { globalConfig: globalConfig ?? null };
};
