import { Ticket } from '@entity/Ticket';

export default {

    Mutation: {
        /**
         * 
         * @param {void} _ 
         * @param {Object} args
         * @property {Object} data  
         * @param {any} ctx 
         */
        async createTicket(_: void, args: { data: Ticket }, ctx: any): Promise<Ticket> {
            args.data.user = ctx.request.auth.id;
            const ticket = Ticket.create(args.data);
            await ticket.save();
            return ticket
        },
    }

}