import CollectionCard from "@/components/CollectionCard";
import { CreateCollectionButton } from "@/components/CreateCollectionButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { GiSloth } from "react-icons/gi";


export default async function Home() {
  return <>
    <Suspense fallback={<WelcomeMsgFallback />}>
      <WelcomeMsg />
    </Suspense>
    <Suspense fallback={<div>Loading collections...</div>}>
      <CollectionList />
    </Suspense>
  </>

}

async function WelcomeMsg() {
  const user = await currentUser();
  await wait(1000);

  if (!user) {
    return (
      <div>
        Please sign in to continue.
      </div>
    );
  }

  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome back, <br /> {user.firstName} {user.lastName}!
      </h1>
    </div>
  );
}

function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  );
}

async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    include: {
      tasks:true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <GiSloth />
          <AlertTitle>No collections found!</AlertTitle>
          <AlertDescription>Create a collection to get started.</AlertDescription>
        </Alert>
        <CreateCollectionButton />
      </div>
    );
  }

  return (
    <>
      <CreateCollectionButton />
      <div className="flex flex-col gap-4 mt-4">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  )
}