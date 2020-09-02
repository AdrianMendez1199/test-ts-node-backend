import { Ticket } from '@entity/Ticket';

export default {
    Mutation: {
        async createTicket(_: void, args: { data: Ticket }, ctx: any): Promise<void> {
            console.log(args.data);
            console.log('ctx', ctx.request.auth);
            // const ticket = Ticket.create(args.data);
            // await ticket.save();
        },
    }

}