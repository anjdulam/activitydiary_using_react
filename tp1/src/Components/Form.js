import React from 'react';

export default function Form() {
    const onsubmit = (e) => {
        e.preventDefault();

        const formData = {
            title: e.target.title.value,
            deadline: e.target.deadline.value,
            status: new Date(e.target.deadline.value) < new Date() ? "pending" : "in Progress",
        };

        // Use the Fetch API to post the data
        fetch('http://localhost:3000/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={onsubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Enter Title
                            </label>
                            <input type="text" className="form-control" id="title" name="title" placeholder="Add a title" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="deadline" className="form-label">
                               Enter Deadline
                            </label>
                            <input type="date" className="form-control" id="deadline" name="deadline" />
                        </div>
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
