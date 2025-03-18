import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;
const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section2 = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section3 = styled.div`
  width: 100%;
  height: auto;
  display: column;
  flex-direction: row;
  justify-content: space-between;
`;

const SecTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const Workouts = () => {
  return (
    <Container>
      <Wrapper>
        <Section>
          <SecTitle>Todays top tutorials</SecTitle>
          <Section2>
            <iframe
              width="100%"
              height="auto"
              src="https://www.youtube.com/embed/mECzqUIDWfU?si=rXNuH7_Dv60R5sDN"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <Section3>
              <h1>How to Do a Pushup</h1>
              <p>
                Pushups are a great way to strengthen your chest, shoulders, and
                triceps. They also engage your core muscles, improving overall
                stability and endurance. The best part is that pushups can be
                done anywhere without the need for any equipment, making them an
                excellent exercise for both beginners and advanced athletes.
              </p>
              <p>
                In this video, you'll learn how to perform a pushup with proper
                form to maximize effectiveness and prevent injuries. We'll cover
                common mistakes to avoid, different variations to match your
                fitness level, and tips to improve your pushup strength over
                time.
              </p>
              <p>
                Whether you're aiming to increase your upper body strength,
                improve your posture, or simply get in a quick workout, pushups
                are a fundamental exercise that should be a part of your
                routine. Watch the video and start building strength today!
              </p>
            </Section3>
          </Section2>
          <Section2>
            <iframe
              width="100%"
              height="auto"
              src="https://www.youtube.com/embed/dAScZVF5o9k?si=e937AEgZ4ohdDgvw"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <Section3>
              <h1>How to Do a Pull-Up</h1>
              <p>
                Pull-ups are one of the best exercises for building upper body
                strength. They primarily target your back muscles (latissimus
                dorsi), biceps, and shoulders while also engaging your core for
                stability. Mastering pull-ups can improve overall fitness and
                enhance other strength-training movements.
              </p>
              <p>
                In this video, you'll learn the proper technique to perform a
                pull-up safely and effectively. We'll cover the correct grip,
                body positioning, and how to engage the right muscles to
                maximize your strength. If you're a beginner, don't worry—we'll
                also share modifications and progression tips, such as assisted
                pull-ups or negative reps, to help you build the strength needed
                to do a full pull-up.
              </p>
              <p>
                Whether you're working towards your first pull-up or trying to
                increase your reps, consistency is key. Focus on maintaining
                good form, avoiding momentum-based movements, and gradually
                increasing your strength over time. Watch the video to start
                improving your pull-up technique today!
              </p>
            </Section3>
          </Section2>
          <Section2>
            <iframe
              width="100%"
              height="auto"
              src="https://www.youtube.com/embed/h4TAUUqK9L0?si=GNh9wlJD9Ov5rFnY"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <Section3>
              <h1>How to Do a Squat</h1>
              <p>
                Squats are one of the most effective lower-body exercises,
                working your quadriceps, hamstrings, glutes, and core. They help
                build strength, improve mobility, and enhance overall athletic
                performance. Squats can be done anywhere, with or without
                weights.
              </p>
              <p>
                In this video, you'll learn the correct squat technique to
                maximize results and prevent injuries. We'll cover essential
                elements such as foot placement, posture, depth, and common
                mistakes to avoid. Proper squatting technique ensures you
                activate the right muscles while reducing strain on your knees
                and lower back.
              </p>
              <p>
                If you're a beginner, start with bodyweight squats to master
                form before adding resistance. As you progress, you can
                incorporate dumbbells, barbells, or resistance bands to increase
                difficulty. We'll also provide modifications, such as sumo
                squats and goblet squats, to add variety to your workout.
              </p>
              <p>
                Squats are a fundamental movement for strength training,
                improving daily activities like lifting and bending. Watch the
                video to perfect your squat form and take your lower-body
                training to the next level!
              </p>
            </Section3>
          </Section2>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Workouts;
