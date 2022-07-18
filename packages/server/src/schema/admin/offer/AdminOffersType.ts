import { objectType } from "nexus";

export const OfferType = objectType({
	name: 'AdminOffers',
	definition(t) {
		t.id('id');
	},
});
