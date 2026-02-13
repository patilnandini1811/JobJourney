"use client";

import Avatar from "./ui/Avatar";
import ProfileStat from "./ui/ProfileStat";
import GradientBtn from "./ui/GradientBtn";
import { FaPlus } from "react-icons/fa6";
import { fetchUser } from "@/lib/api/user";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";


const UserProfile = () => {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return; // avoid running before params exist

    async function loadUser() {
      try {
        const data = await fetchUser(id); // id is a string
        setUser(data);
      } catch (error) {
        console.error("Error loading user", error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);
  console.log(user);
  if (loading) {
    return (
      <>
        <div className="min-h-screen relative w-full flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500 to-sky-400"></div>
          <div className="bg-white relative shadow-lg w-full h-[400px] z-1 -mt-12 md:w-3/4 xl:w-1/2">
            {/*Avatar */}
            <div className="w-full -mt-20 flex justify-center">
              <Avatar size="w-40 h-40" />
            </div>
            <div className="flex justify-center mt-12 w-full h-full">
              <span className="loader"></span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen relative w-full flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500 to-sky-400"></div>
        <div className="bg-white relative shadow-lg w-full h-[400px] z-1 -mt-12 md:w-3/4 xl:w-1/2">
        <div
  onClick={() => router.push(`/applicationform?userId=${id}`)}
  className="absolute top-2 right-2 flex gap-2 items-center text-blue-500 hover:text-blue-700 cursor-pointer"
>
  <FaPlus /> Add Activity
</div>

          {/*Avatar */}
          <div className="w-full -mt-20 flex justify-center">
            <Avatar size="w-40 h-40" />
          </div>
          <h1 className="font-semibold text-2xl text-center">
            {user.username}
          </h1>
          <h2 className="text-center">{user.email}</h2>
          {/*Statistics */}
          <div className="flex justify-between w-4/5 mt-12 mx-auto">
            <ProfileStat stat={12} title="Applied" />
            <ProfileStat stat={20} title="In-Progress" />
            <ProfileStat stat={5} title="Rejected" />
          </div>
          <div className="w-full flex justify-center mt-10">
            <GradientBtn title="Show More" link="#" size="lg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
