import { objectType } from "nexus";

export const OfferType = objectType({
	name: 'AdminOffer',
	definition(t) {
		t.id('id');
	},
});
