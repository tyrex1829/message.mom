// app/account/dashboard/page.tsx
import axios from "axios";
import { notFound } from "next/navigation";
import Image from "next/image";

type ProfileData = {
  email: string;
  username: string;
  name: string;
  avatarUrl?: string | null;
  bio?: string | null;
  socials?: Record<string, string>;
};

type ApiResponse = {
  id: string;
  email: string;
  username: string;
  name: string;
  profile?: {
    avatarUrl?: string | null;
    bio?: string | null;
    socialsJson?: Record<string, string>;
  };
};

export default async function AdminInfo() {
  let profileData: ProfileData | null = null;

  try {
    const res = await axios.get<ApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/account/profile`,
      {
        withCredentials: true, // sends auth cookie
        timeout: 5000, // optional: fail if backend takes too long
      }
    );

    const data = res.data;

    profileData = {
      email: data.email,
      username: data.username,
      name: data.name,
      avatarUrl: data.profile?.avatarUrl ?? null,
      bio: data.profile?.bio ?? null,
      socials: data.profile?.socialsJson ?? {},
    };
  } catch (error: any) {
    console.error("Failed to fetch profile:", error.message);
    // fallback: show 404 if user not found
    return notFound();
  }

  if (!profileData) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Unable to load profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white shadow rounded p-6 space-y-4">
        <h2 className="text-2xl font-bold">{profileData.name}</h2>

        {profileData.avatarUrl && (
          <Image
            src={profileData.avatarUrl}
            alt="Avatar"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}

        {profileData.bio && <p className="text-gray-700">{profileData.bio}</p>}

        {profileData.socials && Object.keys(profileData.socials).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(profileData.socials).map(([key, link]) => (
              <a
                key={key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {key}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
