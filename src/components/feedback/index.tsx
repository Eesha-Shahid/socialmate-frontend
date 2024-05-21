import { submitFeedback } from "@/redux/actions/feedbackAction";
import { FeedbackSelector } from "@/redux/reducers/feedbackReducer";
import { useAppDispatch } from "@/redux/store";
import { Form, Input, Button, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
const { Text } = Typography;

const Feedbacks: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { feedbackSending } = useSelector(FeedbackSelector);

  const onFinish = (values: any) => {
    dispatch(submitFeedback(values.feedback))
    router.push('/auth')
  };

  return (
    <>
      <Text style={{ fontSize: '1rem', fontWeight: '500' , textAlign: 'center'}}>
        Submit Feedback
      </Text>
      <Form
        style={{ marginTop: '2rem' }} 
        name="feedback_form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Feedback"
          name="feedback"
          rules={[{ required: true, message: 'Please input your feedback!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button loading={feedbackSending} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Feedbacks;