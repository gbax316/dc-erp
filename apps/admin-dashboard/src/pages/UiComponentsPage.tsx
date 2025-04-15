import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  Input,
  Select,
  Checkbox,
  Textarea,
  FormField,
  Modal
} from '@/components/ui';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  role: z.string(),
  bio: z.string().optional(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function UiComponentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'>('default');

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
      bio: '',
      terms: false,
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="container mx-auto p-6 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-6">UI Components</h1>
        <p className="text-gray-600 mb-4">
          This page showcases all the UI components available in the system.
        </p>
      </div>

      {/* Button Showcase */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Different styles for different purposes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="default" onClick={() => setSelectedVariant('default')}>Default</Button>
                <Button variant="destructive" onClick={() => setSelectedVariant('destructive')}>Destructive</Button>
                <Button variant="outline" onClick={() => setSelectedVariant('outline')}>Outline</Button>
                <Button variant="secondary" onClick={() => setSelectedVariant('secondary')}>Secondary</Button>
                <Button variant="ghost" onClick={() => setSelectedVariant('ghost')}>Ghost</Button>
                <Button variant="link" onClick={() => setSelectedVariant('link')}>Link</Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">Selected: <span className="font-semibold">{selectedVariant}</span></p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button Sizes</CardTitle>
              <CardDescription>Different sizes for different contexts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Button size="sm">Small Button</Button>
                <Button size="default">Default Button</Button>
                <Button size="lg">Large Button</Button>
                <Button size="icon">🔍</Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">Choose the appropriate size for your UI</p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button States</CardTitle>
              <CardDescription>Different states a button can be in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button className="opacity-70">Loading...</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Form Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Form Components</h2>
        <Card>
          <CardHeader>
            <CardTitle>Sample Form</CardTitle>
            <CardDescription>A form using all our form components</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  id="name"
                  label="Name"
                  error={!!errors.name}
                  errorMessage={errors.name?.message}
                  required
                >
                  <Input {...register('name')} placeholder="Enter your name" />
                </FormField>

                <FormField
                  id="email"
                  label="Email"
                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                  required
                >
                  <Input type="email" {...register('email')} placeholder="your@email.com" />
                </FormField>
              </div>

              <FormField
                id="role"
                label="Role"
                error={!!errors.role}
                errorMessage={errors.role?.message}
                required
              >
                <Select
                  {...register('role')}
                  options={[
                    { value: 'admin', label: 'Administrator' },
                    { value: 'manager', label: 'Manager' },
                    { value: 'user', label: 'Regular User' },
                    { value: 'guest', label: 'Guest' },
                  ]}
                />
              </FormField>

              <FormField
                id="bio"
                label="Bio"
                error={!!errors.bio}
                errorMessage={errors.bio?.message}
              >
                <Textarea
                  {...register('bio')}
                  placeholder="Tell us about yourself"
                  className="min-h-[100px]"
                />
              </FormField>

              <FormField
                id="terms"
                error={!!errors.terms}
                errorMessage={errors.terms?.message}
              >
                <Checkbox
                  label="I accept the terms and conditions"
                  {...register('terms')}
                />
              </FormField>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Cards Showcase */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>A simple card with header and content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is a basic card that can be used for displaying information.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card with Footer</CardTitle>
              <CardDescription>A card with a footer section</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card includes a footer section for actions or additional information.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </CardFooter>
          </Card>

          <Card className="border-primary">
            <CardHeader className="bg-primary/10">
              <CardTitle>Styled Card</CardTitle>
              <CardDescription>A card with custom styling</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Cards can be customized with different borders, backgrounds, and more.</p>
            </CardContent>
            <CardFooter className="bg-primary/5">
              <p className="text-sm text-primary">Last updated: Today</p>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sample Modal"
        description="This is an example of our modal component"
        size="md"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p>Modal content goes here. You can add forms, information, or any other content.</p>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-sm">Modals are useful for focused tasks and confirmations.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
} 