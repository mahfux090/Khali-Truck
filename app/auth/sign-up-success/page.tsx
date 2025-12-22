import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>We&apos;ve sent you a confirmation link</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border bg-muted/50 p-4">
            <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="flex-1 text-sm">
              <p className="font-medium">Please verify your email address</p>
              <p className="mt-1 text-muted-foreground">
                Click the link in the email we sent you to activate your account and complete your profile setup.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-center text-sm text-muted-foreground">
            <p>Didn&apos;t receive the email? Check your spam folder.</p>
          </div>

          <Link href="/auth/login" className="block">
            <Button className="w-full" size="lg">
              Go to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
