import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import "../styles/NotFound.css";

function NotFound() {
  const navigate = useNavigate();
  const [redirectCount, setRedirectCount] = useState(7);

  const decreaseTimer = () => {
    if (redirectCount > 0) {
      setRedirectCount(redirectCount - 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(decreaseTimer, 1000);

    if (redirectCount === 0) {
      clearInterval(timer);
      navigate("/");
    }

    return () => clearInterval(timer);
  }, [navigate, redirectCount]);

  return (
    <section aria-describedby="web-application error: 404 page, empty parking space">
      <Row className="not-found-container mt-4">
        <Col className="container-fluid not-found-background py-2 px-4">
          <div className="row my-1 d-flex justify-content-end align-items-end h-100 text-align-center">
            <div className="col-lg-5 text-black text-background p-2">
              <h2 className="text-center">
                Oops!<br></br>
                404: Not Found
              </h2>
              <p className="text-center">
                Redirect in{" "}
                <span className="redirect-count">
                  <strong>{redirectCount}</strong>
                </span>{" "}
                seconds...
              </p>
              <Link to={"/"} className="btn btn-warning btn-block w-100">
                <i className="bi bi-house-up"></i> Home
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default NotFound;
