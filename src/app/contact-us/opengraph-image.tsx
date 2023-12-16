import { Icons } from "@/components/Icons";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "SyllabusX";

export const size = {
    width: 2400,
    height: 1260,
};

export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#000000",
                }}
            >
                <Icons.x style={{ height: "32rem", width: "32rem" }} />
            </div>
        ),
        { ...size }
    );
}
