import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { submitContactMessage } from '@/services/contactService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { SITE } from '@/constants/site';
import { getWhatsAppContactUrl } from '@/utils/whatsapp';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(100),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(3, 'Subject is too short').max(200),
  message: z.string().trim().min(10, 'Message is too short').max(3000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  });

  const mutation = useMutation({
    mutationFn: submitContactMessage,
    onSuccess: (_data, values) => {
      toast.success('Thanks for reaching out! Opening WhatsApp to send us your message…');
      window.open(getWhatsAppContactUrl(values), '_blank', 'noopener,noreferrer');
      reset();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not send your message')),
  });

  return (
    <section className="bg-accent/20 py-12 md:py-16">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Us"
          description="Reach out for placements, hiring, or training enquiries."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-4">
            <Card className="flex items-center gap-3">
              <Phone size={20} className="text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-secondary">Call Us</p>
                <a href={`tel:${SITE.contact.phone}`} className="text-sm text-muted hover:text-primary">
                  {SITE.contact.phone}
                </a>
              </div>
            </Card>
            <Card className="flex items-center gap-3">
              <Mail size={20} className="text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-secondary">Email Us</p>
                <a href={`mailto:${SITE.contact.email}`} className="text-sm text-muted hover:text-primary">
                  {SITE.contact.email}
                </a>
              </div>
            </Card>
            <Card className="flex items-center gap-3">
              <MapPin size={20} className="text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-secondary">Visit Us</p>
                <p className="text-sm text-muted">{SITE.contact.location}</p>
              </div>
            </Card>
          </div>

          <Card>
            <form onSubmit={handleSubmit((values) => mutation.mutate(values))} noValidate className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input label="Full name" placeholder="Your name" error={errors.name?.message} {...register('name')} />
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  label="Phone (optional)"
                  type="tel"
                  placeholder="+91 98765 43210"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
                <Input label="Subject" placeholder="How can we help?" error={errors.subject?.message} {...register('subject')} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-secondary">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us more..."
                  className="w-full rounded-xl border border-secondary/15 bg-white px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  {...register('message')}
                />
                {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
              </div>
              <Button type="submit" size="lg" disabled={mutation.isPending} className="w-full sm:w-auto">
                {mutation.isPending ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}
