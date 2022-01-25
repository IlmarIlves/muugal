import { queryField, idArg } from 'nexus';


import { UserEntity } from '../../../entities/User';
import { UserType } from '../../../entities/UserType';

export const news = queryField('users', {
	type: UserType,
	description: 'Returns users',
	args: {
		id: idArg({ required: true, description: 'News item id' }),
	},
	resolve: async (_parent, args: { id: string }) => {
		return UserEntity.findOne(args.id);
	},
});
