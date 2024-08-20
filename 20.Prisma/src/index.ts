import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
//abv 2 lines similar to import mongoose from 'mongoose'; mongoose.connect('')

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
  const response=await prisma.user.create({
    data:{
        username,
        password,
        firstName,
        lastName
    },
    select:{  //will only return the following things as a response
        id:true,
        username:true
    }
  })
  console.log(response);
}
// insertUser("shivam","123","Shivam","Kedar");
// insertUser("batman","123","Batman","Wayne");
//if the function which ran is errranous the id gets incremented

interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser(username: string, {
    firstName,
    lastName
}: UpdateParams) {
  const response=await prisma.user.update({
    where:{
        username
    },
    data:{
        firstName,
        lastName
    }
  })
  console.log(response);
}
// updateUser("batman",{firstName:"Bruce",lastName:"Wayne"});

async function getUser(username: string) {
  const response=await prisma.user.findFirst({
    where:{
        username
    },
    select:{
        firstName:true,
        lastName:true
    }
  })
  console.log(response)
}
getUser("batman");

