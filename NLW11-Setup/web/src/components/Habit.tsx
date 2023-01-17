type HabitProps = {
  completed: boolean;
};

export function Habit(props: HabitProps) {
  return <p>{props.completed}</p>;
}
