import glob from 'fast-glob';

export async function loadTypes(globs: string[]) {
	const filenames = await glob(globs.map((glob) => glob.replace(/\\/g, '/')));

	return filenames.map((filename) => require(filename as string));
}
