import Stepper from './Stepper';

export default function StepperContainer(props) {
  const { step } = props;
  const stepsArray = [
    {
      label: 'Chọn gói',
    },
    {
      label: 'Chuyển tiền',
    },
  ];
  return (
    <>
      <div className="stepper-container-horizontal">
        <Stepper direction="horizontal" currentStep={step} steps={stepsArray} stepColor="#11c15b" />
      </div>
    </>
  );
}
