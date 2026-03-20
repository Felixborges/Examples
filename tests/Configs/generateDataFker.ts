import { faker } from '@faker-js/faker'


export function randomGeneratedUserToSaveLater(){
    const birthdate = faker.date.birthdate()
    return{

    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email( {provider: 'test.com'}),
    phoneNumber:faker.phone.number({ style: 'international' }),
    password: faker.internet.password({ length: 12 }),
    day: birthdate.getDate().toString(),
    month: (birthdate.getMonth() + 1).toString(),
    year: birthdate.getFullYear().toString(),

   
}
     
}
