import React from 'react';
import { useField } from '../hooks';

const CreateNew = (props) => {
  const { resetField: resetContent, ...content } = useField('text');
  const { resetField: resetAuthor, ...author } = useField('text');
  const { resetField: resetInfo, ...info } = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
  };

  const resetForm = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type='button' onClick={resetForm}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
