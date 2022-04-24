import { objectType } from "nexus";

export const OrderType = objectType({
	name: 'Order',
	definition(t) {
		t.string('userId');
	},
});
