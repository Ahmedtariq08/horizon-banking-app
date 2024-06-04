import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import react from "react";

export const Footer = ({ user, type = "desktop" }: FooterProps) => {
    const router = useRouter();
    const userName =
        user?.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user?.name ?? "Guest";
    const userInitial = userName[0].toLocaleUpperCase();

    const handleLogout = async () => {
        const response = await logoutAccount();
        if (response.isSuccess) {
            router.push("/sign-in");
        }
    };

    return (
        <footer className="footer">
            <div
                className={
                    type === "mobile" ? "footer_name-mobile" : "footer_name"
                }
            >
                <p className="text-xl font-bold text-gray-700">{userInitial}</p>
            </div>
            <div
                className={
                    type === "mobile" ? "footer_email-mobile" : "footer_email"
                }
            >
                <h1 className="text-14 truncate font-normal text-gray-700 font-semibold">
                    {userName}
                </h1>
                <p className="text-14 truncate font-normal text-gray-600">
                    {user?.email}
                </p>
            </div>
            <div className="footer_image" onClick={handleLogout}>
                <Image
                    src={"icons/logout.svg"}
                    alt="logout"
                    fill
                    title="Logout"
                />
            </div>
        </footer>
    );
};
