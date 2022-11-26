import { join as joinPath } from "path";
import { faker } from '@faker-js/faker';
import { rm, mkdir, writeFile } from 'node:fs/promises';

export class FakeDataGenerator {

    static async generate() {
        // clear data directory
        try { await rm("data", { recursive: true, force: true }); }
        catch {}

        await mkdir("data");

        let slots = [];
        for(let i = 0; i < 50; i++) {
            let addr = {
                street: faker.address.street(),
                street2: faker.address.secondaryAddress(),
                city: faker.address.city()
            };

            let time = faker.date.soon(1);
            let place = faker.company.name();

            slots.push({
                place: place,
                time: time,
                address: addr
            });
        }

        slots = slots.sort((a, b) => a.time - b.time);
        
        const data = JSON.stringify(slots);
        await writeFile(joinPath("data", "availability.json"), data);
    }
}