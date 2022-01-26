import { objectType } from "nexus";

export const UserType = objectType({
	name: 'User',
	definition(t) {
		t.string('id');
		t.string('firstName');
		t.string('lastName');
	},
});
