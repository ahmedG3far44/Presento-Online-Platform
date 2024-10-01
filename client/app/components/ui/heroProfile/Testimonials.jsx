import TestimonialsCard from "../cards/TestimonialsCard";

function Testimonials({ TestimonialsList, isLogged }) {
  return (
    <section
      className={
        "grid grid-cols-4 grid-flow-row max-md:grid-cols-2 max-sm:grid-cols-1 w-full gap-4 my-8"
      }
    >
      {TestimonialsList.map((testimonials) => {
        return (
          <TestimonialsCard
            id={testimonials.id}
            key={testimonials.id}
            profile={testimonials.profile}
            name={testimonials.name}
            video={testimonials.video}
            position={testimonials.position}
            feedback={testimonials.feedback}
            isLogged={isLogged}
          />
        );
      })}
    </section>
  );
}

export default Testimonials;
