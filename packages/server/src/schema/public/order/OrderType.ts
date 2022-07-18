import { objectType } from "nexus";

export const OrderType = objectType({
	name: 'Order',
	definition(t) {
		t.id('id');
		t.id('userId');
		t.string('email');
		t.string('telephone');
		t.field('colors', { type: "OrderColorsEnum", description: "Order available colors"});
		t.int('amount', { description: "User role"});
		t.string('additionalInfo', { description: "User role"});
		t.string('priceInCents', {nullable: true});
		t.string('finishedInDays', {nullable: true});
		t.string('lastOffererUserId', {nullable: true});
		t.string('fileUrl');
	},
});
