"use client";
import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
function Navbar() {
  const [visible, setVisibility] = useState(false);
  return (
    <div className="sticky flex flex-col text-white gap-y-3 py-3 items-center  top-28 ">
      <button
        onClick={() => {
          setVisibility(!visible);
        }}
        className=" aspect-square text-3xl p-3   rounded-full bg-nBlack dark:text-nBlack dark:bg-white mb-7"
      >
        {visible ? <MdClose /> : <MdAdd />}
      </button>
      {visible && (
        <>
          {buttonProps.map((props, index) => {
            return (
              <button
                key={index}
                onClick={async () => {
                  let newNote = {
                    editing: false,
                    accent: props.accent,
                    content: ``,
                    lastModified: new Date().toDateString(),
                  };
                  addDoc(collectionRef, newNote).then((docRef) => {
                    mutate((data: any) => {
                      return [
                        ...data,
                        { ...newNote, id: docRef.id, editing: true }]
                    });
                  });
                }}
                className={`button ${props.accent}`}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
const buttonProps = [
  {
    accent: "gold",
  },
  {
    accent: "orange",
  },
  {
    accent: "purple",
  },
  {
    accent: "blue",
  },
  {
    accent: "lime",
  },
];
export default Navbar;
