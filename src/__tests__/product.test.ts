import supertest from "supertest";
import createServer from "../utils/server";
import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose, { mongo } from "mongoose";
import { after } from "lodash";

const app = createServer()

describe('product',()=>{
    
    beforeAll(async()=>{
        console.log("opp")  
        const mongoServer = await MongoMemoryServer.create()
        console.log("first",mongoServer)
        const resp = await mongoose.connect(mongoServer.getUri())
        console.log("resp",resp)
    })
    afterAll(async()=>{
        await mongoose.disconnect()
        const resp = await mongoose.connection.close()
        console.log("respf", resp);

    })

    describe("get product route", () => {
        describe("given product does not exist", () => {
            it("should return a 404",async ()=>{
                const productId = 'product-123'

                await supertest(app).get(`/api/products/${productId}`).expect(404)
            })
        });
    });
})