import { ComponentPropsWithoutRef, ReactNode, useState } from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../../ui/field';
import { Input } from '../../ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../../ui/input-group';
import { Textarea } from '../../ui/textarea';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName;
  label: ReactNode;
  description?: ReactNode;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>['control'];
};

type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  horizontal?: boolean;
  controlFirst?: boolean;
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>['render']
    >[0]['field'] & {
      'aria-invalid': boolean;
      id: string;
    }
  ) => ReactNode;
};

type FormControlFunc<
  ExtraProps extends Record<string, unknown> = Record<never, never>,
> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues> &
    ExtraProps & { className?: string }
) => ReactNode;

function FormBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control,
  label,
  name,
  description,
  controlFirst,
  horizontal,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const labelElement = (
          <>
            <FieldLabel htmlFor={field.name} className='font-semibold'>
              {label}
            </FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </>
        );
        const control = children({
          ...field,
          id: field.name,
          'aria-invalid': fieldState.invalid,
        });
        const errorElem = fieldState.invalid && (
          <FieldError errors={[fieldState.error]} />
        );

        return (
          <Field
            data-invalid={fieldState.invalid}
            orientation={horizontal ? 'horizontal' : undefined}
          >
            {controlFirst ? (
              <>
                {control}
                <FieldContent>
                  {labelElement}
                  {errorElem}
                </FieldContent>
              </>
            ) : (
              <>
                <FieldContent>{labelElement}</FieldContent>
                {control}
                {errorElem}
              </>
            )}
          </Field>
        );
      }}
    />
  );
}
type InputProps = ComponentPropsWithoutRef<typeof Input>;
export const FormInput: FormControlFunc<InputProps> = (props) => {
  return (
    <FormBase {...props}>{(field) => <Input {...field} {...props} />}</FormBase>
  );
};
export const FormPasswordInput: FormControlFunc<
  Omit<ComponentPropsWithoutRef<typeof InputGroupInput>, 'type'>
> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <FormBase {...props}>
      {(field) => (
        <InputGroup>
          <InputGroupInput
            {...field}
            {...props}
            type={visible ? 'text' : 'password'}
          />
          <InputGroupAddon align='inline-end'>
            <InputGroupButton
              type='button'
              onClick={() => setVisible((v) => !v)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {visible ? (
                <EyeOffIcon className='size-4 text-muted-foreground' />
              ) : (
                <EyeIcon className='size-4 text-muted-foreground' />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      )}
    </FormBase>
  );
};

export const FormTextarea: FormControlFunc = (props) => {
  return (
    <FormBase {...props}>
      {(field) => <Textarea {...field} className={props.className} />}
    </FormBase>
  );
};
