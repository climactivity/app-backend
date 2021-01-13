import {render} from "@testing-library/svelte";
import AspectList from "./AspectList.svelte"
import '@testing-library/jest-dom';
import type {Aspect} from "./AspectTypes";

// test("should let the user know when list is empty", () => {
//     const {getByText} = render(AspectList, {
//             props: {
//                 aspects: []
//             }
//         })
//
//     expect(getByText("No aspects exist yet.")).toBeInTheDocument();
// });
//
// test("should show the new aspect button in an empty List", () => {
//     const {container} = render(AspectList, {
//         props: {
//             aspects: []
//         }
//     })
//
//     expect(container.querySelector("button")).toBeInTheDocument();
//     expect(container.querySelector("button")).toContainHTML("New aspect");
// });
//
// test("should display a list with the names of the provided aspects", () => {
//
//     let firstAspect: Aspect = {name: "Aspect 1", question: "Question 1", trackingOptions: []}
//     let secondAspect: Aspect = {name: "Aspect 2", question: "Question 2", trackingOptions: []}
//
//     const {getByText} = render(AspectList, {
//         props: {
//             aspects: [firstAspect, secondAspect]
//         }
//     })
//
//     expect(getByText("Aspect 1")).toBeInTheDocument();
//     expect(getByText("Aspect 2")).toBeInTheDocument();
// });