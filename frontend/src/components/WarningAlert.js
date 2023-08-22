const WarningAlert = ({error}) => {
  return (
    <div className="container">
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>{error}</strong>
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
