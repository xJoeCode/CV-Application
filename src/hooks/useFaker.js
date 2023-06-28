import {faker} from '@faker-js/faker'


export default function useFaker(options){

    if (options === 'account'){
        const fakeAcc = {email: faker.internet.email()}
        return {fakeAcc}
    }
}