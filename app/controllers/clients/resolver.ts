import { Client } from './../../entity/client'
import { getTypeORMConn } from '../../db'

interface IFetchClientArgs {
	skip: number
	take: number
}

export const resolvers = {
	Query: {
		hello: () => {
			return 'Hello world!'
		},

		async clients(_: any, { skip, take }: IFetchClientArgs) {
			Client.useConnection(await getTypeORMConn())
			return (await Client.find({ skip, take })) || []
		},

		async client(_: any, { id }: { id: string }) {
			Client.useConnection(await getTypeORMConn())
			return Client.findOne(id)
		},
	},

	Mutation: {
		// upvotePost: (_, { postId }) => {
		// 	const post = find(posts, { id: postId })
		// 	if (!post) {
		// 		throw new Error(`Couldn't find post with id ${postId}`)
		// 	}
		// 	post.votes += 1
		// 	return post
		// },
		async saveClient(parent: {}, args: any) {
			debugger
			// Client.save()
		},
	},

	// Author: {
	// 	posts: author => filter(posts, { authorId: author.id }),
	// },

	// Post: {
	// 	author: post => find(authors, { id: post.authorId }),
	// },
}
