import { objectType } from "nexus";

export const OfferType = objectType({
	name: 'Offer',
	definition(t) {
		t.id('id');
	},
});
