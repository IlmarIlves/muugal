import { objectType } from "nexus";

export const UserType = objectType({
	name: 'User',
	definition(t) {
		t.id('id');
		t.string('email');
		t.string('firstName');
		t.string('lastName');
		t.string('telephone');
		t.string('packageMachineLocation');
		// t.list.field('userRole', {type: "UserRoleEnum", description: "User role"});
		t.field('userStatus', {type: "UserStatusEnum", description: "User status"});
	},
});
