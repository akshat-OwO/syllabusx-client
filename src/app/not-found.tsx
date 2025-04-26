import NotFoundClient from "@/components/NotFoundClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Oops! Page Not Found",
    description:
        "Oops! It seems like you've wandered into uncharted territory. Our SyllabusX compass couldn't locate the page you're looking for. Don't worry, let's guide you back to the main path of academic resources",
};

const NotFound = () => {
    return <NotFoundClient />;
};

export default NotFound;
