import { objectType } from "nexus";

export const OrderType = objectType({
	name: 'Order',
	definition(t) {
		t.id('id');
		t.id('userId');
		t.string('email');
		t.string('telephone');
		t.string('colors', { description: "User role"});
		t.int('amount', { description: "User role"});
		t.string('additionalInfo', { description: "User role"});
		t.string('data');
		t.string('mimeType');
	},
});
