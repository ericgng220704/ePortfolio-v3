"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Image from "next/image";

export default function ProjectModal({
  isOpen,
  onOpenChange,
  content,
  title,
  urls,
}) {
  return (
    <Modal
      backdrop="opaque"
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black">
              {title}
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex items-center flex-col gap-2">
                {urls.map((url, index) => (
                  <div key={index} className="rounded-xl overflow-hidden">
                    <Image src={url} height={400} width={400} alt={`${url}`} />
                  </div>
                ))}
              </div>
              <div className="text-black">{content}</div>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
