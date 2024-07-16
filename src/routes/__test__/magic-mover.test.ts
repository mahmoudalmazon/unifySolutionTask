import { app } from '../../app';
import request from 'supertest';
describe('Add a magic mover', () => {
    it('should add a magic mover successfully and return status code 201', async () => {
        const response = await request(app)
            .post('/api/v1/movers/')
            .send({ name: 'mahmoud', weightLimit: 5 });

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('mahmoud');
        expect(response.body.weightLimit).toBe(5);
    });

    it('should return status code 422 if the request is missing the name field', async () => {
        const response = await request(app)
            .post('/api/v1/movers/')
            .send({ weightLimit: 5 });

        expect(response.statusCode).toBe(422);
    });

    it('should return status code 422 if the request is missing the weightLimit field', async () => {
        const response = await request(app)
            .post('/api/v1/movers/')
            .send({ name: 'mahmoud' });

        expect(response.statusCode).toBe(422);
    });

    it('should return status code 422 if the weightLimit field is not a number', async () => {
        const response = await request(app)
            .post('/api/v1/movers/')
            .send({ name: 'mahmoud', weightLimit: 'five' });

        expect(response.statusCode).toBe(422);

    });
});
describe('Add a magic item', () => {

it('should add a magic item successfully and return status code 201', async () => {
    const response = await request(app)
        .post('/api/v1/movers/items')
        .send({ name: 'mahmoud', weight: 5 });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('mahmoud');
    expect(response.body.weight).toBe(5);
});
it('should return status code 422 when required fields are missing', async () => {
    const response = await request(app)
        .post('/api/v1/movers/items')
        .send({ weight: 5 });

    expect(response.statusCode).toBe(422);
});
it('should return status code 422 when data is invalid', async () => {
    const response = await request(app)
        .post('/api/v1/movers/items')
        .send({ name: 'mahmoud', weight: 'five' });

    expect(response.statusCode).toBe(422);
})
})
it('should add a load successfully and return status code 200', async () => {
    const magicMover = await request(app)
    .post('/api/v1/movers/')
    .send({ name: 'mahmoud', weightLimit: 5 });
    const magicItem = await request(app)
    .post('/api/v1/movers/items')
    .send({ name: 'mahmoud', weight: 5 });
    
    const response = await request(app)
        .post('/api/v1/movers/load')
        .send({ magicMoverId: magicMover.body._id, itemIds: [
            magicItem.body._id
        ] });
    expect(response.statusCode).toBe(200);
});
it('should a start-mission successfully and return status code 200', async () => {
    const magicMover = await request(app)
    .post('/api/v1/movers/')
    .send({ name: 'mahmoud', weightLimit: 5 });
    const magicItem = await request(app)
    .post('/api/v1/movers/items')
    .send({ name: 'mahmoud', weight: 5 });
    
    const load = await request(app)
    .post('/api/v1/movers/load')
    .send({ magicMoverId: magicMover.body._id, itemIds: [
        magicItem.body._id
    ] });
    const response = await request(app)
        .post(`/api/v1/movers/${magicMover.body._id}/start-mission`)
        .send();
    expect(response.statusCode).toBe(200);
});
it('should  a end-mission successfully and return status code 200', async () => {
    const magicMover = await request(app)
    .post('/api/v1/movers/')
    .send({ name: 'mahmoud', weightLimit: 5 });
    const magicItem = await request(app)
    .post('/api/v1/movers/items')
    .send({ name: 'mahmoud', weight: 5 });
    
    const load = await request(app)
    .post('/api/v1/movers/load')
    .send({ magicMoverId: magicMover.body._id, itemIds: [
        magicItem.body._id
    ] });
    const startMission = await request(app)
    .post(`/api/v1/movers/${magicMover.body._id}/start-mission`)
    .send();
    const response = await request(app)
        .post(`/api/v1/movers/${magicMover.body._id}/end-mission`)
        .send();
    expect(response.statusCode).toBe(200);
});
it('should return status code 200 , top', async () => {
    const response = await request(app)
        .get(`/api/v1/movers/top`)
        .send();
    expect(response.statusCode).toBe(200);
});