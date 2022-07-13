import { Spinner } from "react-bootstrap";

export default function LoadingBox() {
    return (
        <Spinner animation="border" role="status">
            <span classname="visually-hidden">Loading...</span>
        </Spinner>
    )

}