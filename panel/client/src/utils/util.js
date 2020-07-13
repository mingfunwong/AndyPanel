import { Message } from 'element-ui';

const showToast = (mess) => {
  Message({
    type: mess.type,
    message: mess.message
  });
};

export default { showToast };
