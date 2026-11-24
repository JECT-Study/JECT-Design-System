import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FIELD_PLAYGROUND_ARGS,
  FIELD_WIDTH,
  fieldArgTypes,
  FormResult,
} from "@storybook-utils/field";
import { FlexColumn, FlexRow, Label } from "@storybook-utils/layout";
import { useState } from "react";

import { Textarea } from "./Textarea";
import { BlockButton } from "../Button/BlockButton";

/**
 * 여러 줄 텍스트를 입력하는 필드입니다. 오른쪽 아래 손잡이로 세로 방향 크기를 조절할 수 있습니다.
 */
const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  args: {
    children: null,
  },
  argTypes: {
    ...fieldArgTypes,
    status: {
      control: "inline-radio",
      options: ["default", "error"],
      description: "유효성/피드백 상태",
      table: { defaultValue: { summary: "default" } },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: FIELD_PLAYGROUND_ARGS,
  render: args => (
    <Textarea {...args} style={FIELD_WIDTH}>
      <Textarea.Label tooltip='도움말 문구'>레이블</Textarea.Label>
      <Textarea.Control placeholder='플레이스홀더' />
      <Textarea.Footer>
        <Textarea.Helper>헬퍼 텍스트</Textarea.Helper>
      </Textarea.Footer>
    </Textarea>
  ),
};

/**
 * `status`에 따라 테두리와 포커스 링, 헬퍼 텍스트, 글자 수 표시 색상이 함께 변경됩니다.
 */
export const Statuses: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(["default", "error"] as const).map(status => (
        <FlexColumn key={status} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{status}</Label>
          <Textarea status={status} style={FIELD_WIDTH}>
            <Textarea.Label>레이블</Textarea.Label>
            <Textarea.Control defaultValue='입력 값' placeholder='플레이스홀더' />
            <Textarea.Footer>
              <Textarea.Helper>헬퍼 텍스트</Textarea.Helper>
            </Textarea.Footer>
          </Textarea>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `disabled`와 `readonly`에서는 입력과 크기 조절을 할 수 없습니다.
 * `disabled`는 포커스를 받을 수 없으며, `readonly`는 포커스를 받을 수 있습니다.
 */
export const States: Story = {
  render: () => (
    <FlexRow gap='32px' style={{ alignItems: "flex-start" }}>
      {(
        [
          ["disabled", { disabled: true }],
          ["readonly", { readonly: true }],
          ["required", { required: true }],
        ] as const
      ).map(([name, props]) => (
        <FlexColumn key={name} gap='16px' style={{ alignItems: "flex-start" }}>
          <Label>{name}</Label>
          <Textarea {...props} style={FIELD_WIDTH}>
            <Textarea.Label>레이블</Textarea.Label>
            <Textarea.Control defaultValue='입력 값' placeholder='플레이스홀더' />
            <Textarea.Footer>
              <Textarea.Helper>헬퍼 텍스트</Textarea.Helper>
            </Textarea.Footer>
          </Textarea>
        </FlexColumn>
      ))}
    </FlexRow>
  ),
};

/**
 * `maxLength`를 지정하면 `Textarea.Counter`에 현재 글자 수와 최대 글자 수를 함께 표시합니다.
 */
export const WithCounter: Story = {
  render: () => (
    <Textarea style={FIELD_WIDTH}>
      <Textarea.Label>레이블</Textarea.Label>
      <Textarea.Control maxLength={100} defaultValue='입력 값' placeholder='플레이스홀더' />
      <Textarea.Footer>
        <Textarea.Helper>헬퍼 텍스트</Textarea.Helper>
        <Textarea.Counter />
      </Textarea.Footer>
    </Textarea>
  ),
};

const FormPreview = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setSubmitted(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))));
      }}
      onReset={() => setSubmitted(null)}
    >
      <FlexColumn gap='16px' style={{ alignItems: "flex-start" }}>
        <Textarea style={FIELD_WIDTH}>
          <Textarea.Label>레이블</Textarea.Label>
          <Textarea.Control
            name='text'
            maxLength={100}
            defaultValue='입력 값'
            placeholder='플레이스홀더'
          />
          <Textarea.Footer>
            <Textarea.Helper>헬퍼 텍스트</Textarea.Helper>
            <Textarea.Counter />
          </Textarea.Footer>
        </Textarea>
        <FlexRow gap='8px' style={FIELD_WIDTH}>
          <BlockButton type='reset' style={{ flex: 1 }}>
            초기화
          </BlockButton>
          <BlockButton type='submit' style={{ flex: 1 }}>
            제출
          </BlockButton>
        </FlexRow>
        <FormResult value={submitted} />
      </FlexColumn>
    </form>
  );
};

/**
 * `name`을 지정하면 입력한 값이 폼 제출에 포함됩니다.
 * 초기화를 누르면 `defaultValue`로 돌아가고, `Textarea.Counter`도 그 글자 수를 표시합니다.
 */
export const WithForm: Story = {
  render: () => <FormPreview />,
};
