import { objectType } from "nexus";

export const Viewer = objectType({
	name: 'Viewer',
	definition(t) {
		t.string('accessToken');
		// t.string('firstName');
		// t.string('lastName');
	},
});
