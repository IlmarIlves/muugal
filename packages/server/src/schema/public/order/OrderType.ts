import { objectType } from "nexus";

export const UserType = objectType({
	name: 'Order',
	definition(t) {
		t.id('id');
		t.string('userId');
	},
});
