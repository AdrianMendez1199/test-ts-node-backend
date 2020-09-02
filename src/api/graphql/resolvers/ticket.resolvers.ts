import { Ticket } from '@entity/Ticket';
import { User } from '@entity/User';

export default {

    Mutation: {
        /**
         *  create and assing ticket
         * @param {void} _ 
         * @param {Object} args
         * @property {Object} data  
         * @param {any} ctx 
         */
        async createTicket(_: void, args: { data: Ticket }, ctx: any): Promise<Ticket> {
            args.data.user = ctx.request.auth.id;
            const ticket = Ticket.create(args.data);
            await ticket.save();
            return ticket;
        },
    },


    Ticket: {
        /**
         * find ticket create by user
         * @param {Ticket} parent
         * @property {int} id   
         */
        async createdBy(parent: Ticket): Promise<User | undefined> {
            const ticket = await Ticket.findOne(parent.id, { relations: ['user'] });
            return ticket?.user;
        }
    }

}