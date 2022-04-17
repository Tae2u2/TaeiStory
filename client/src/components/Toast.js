import React, { useCallback, useEffect } from "react";

const Toast = ({ toastlist, setList }) => {
  const deleteToast = useCallback(
    (id) => {
      const toastListItem = toastlist.filter((e) => e.id !== id);
      setList(toastListItem);
    },
    [toastlist, setList]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastlist.length) {
        deleteToast(toastlist[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [toastlist, deleteToast]);

  return (
    <div className="toast-container">
      {toastlist.map((toast, i) => (
        <div
          key={i}
          className="toast-notification toast"
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <button className="toast-btn" onClick={() => deleteToast(toast.id)}>
            X
          </button>
          <div>
            <p className="toast-description">
              <span className="toast-title">{toast.title} : </span>
              {toast.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
