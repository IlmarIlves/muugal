import { objectType } from "nexus";

export const UserType = objectType({
	name: 'User',
	definition(t) {
		t.id('id');
		t.id('firstName');
		t.string('lastName');
		t.string('age');
	},
});