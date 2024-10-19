import TestimonialsCard from "../cards/TestimonialsCard";
function Testimonials({ TestimonialsList }) {
  return (
    <section
      className={
        "grid grid-cols-4 grid-flow-row max-md:grid-cols-2 max-sm:grid-cols-1 w-full gap-4 my-8"
      }
    >
      {!!TestimonialsList?.length &&
        TestimonialsList.map((testimonials) => {
          const { id, name, profile, video, position, feedback } = testimonials;
          return (
            <TestimonialsCard
              id={id}
              key={id}
              profile={profile}
              name={name}
              video={video}
              position={position}
              feedback={feedback}
              isLogged={false}
            />
          );
        })}
    </section>
  );
}

export default Testimonials;
