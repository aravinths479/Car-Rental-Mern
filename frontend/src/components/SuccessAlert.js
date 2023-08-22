const WarningAlert = ({success}) => {
    return (
      <div className="container">
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>{success}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    );
  };
  
  export default WarningAlert;
  