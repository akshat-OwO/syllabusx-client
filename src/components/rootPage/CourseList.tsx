import LayoutWrapper from '@/layouts/LayoutWrapper'
import { FC } from 'react'
import Btech from '../courses/Btech'
import { Button } from '../ui/button'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

interface CourseListProps {
  
}

const CourseList: FC<CourseListProps> = ({}) => {
  return <LayoutWrapper className="py-20 overflow-hidden">
  <div className="flex flex-col lg:flex-row lg:justify-center gap-20">
      <div className="flex items-center lg:items-start lg:flex-col gap-10">
          <div className="flex flex-col gap-2">
              <h3 className="text-accent-foreground font-semibold text-xl md:text-3xl">
                  Live on the edge
              </h3>
              <p className="text-muted-foreground text-base md:text-2xl font-semibold">
                  We plan to support every IPU course.
              </p>
          </div>
          <div className="h-72 w-72 bg-accent rounded-md" />
      </div>
      <ScrollArea className="max-w-xs sm:max-w-lg mx-auto md:m-0 md:max-w-none lg:hidden">
          <div className="w-[100vw] md:w-auto grid grid-cols-3 gap-2">
              <Btech>
                  <Button
                      variant={'secondary'}
                      className="w-full h-full py-6"
                  >
                      B.TECH
                  </Button>
              </Btech>
              <Button
                  variant={'outline'}
                  disabled
                  className="w-full h-full py-6"
              >
                  BCA
              </Button>
              <Button
                  variant={'outline'}
                  disabled
                  className="w-full h-full py-6"
              >
                  BBA
              </Button>
              <Button
                  variant={'outline'}
                  disabled
                  className="w-full h-full py-6"
              >
                  B.COM
              </Button>
              <Button
                  variant={'outline'}
                  disabled
                  className="w-full h-full py-6"
              >
                  B.Ed
              </Button>
              <Button
                  variant={'outline'}
                  disabled
                  className="w-full h-full py-6"
              >
                  LLB
              </Button>
              <Button
                  variant={'outline'}
                  disabled
                  className="w-full h-full py-6"
              >
                  B.A
              </Button>
              <Button
                  variant={'outline'}
                  disabled
                  className="w-full h-full py-6"
              >
                  BHMCT
              </Button>
              <Button
                  variant={'outline'}
                  disabled
                  className="w-full h-full py-6"
              >
                  B.Voc
              </Button>
              <Button
                  variant={'outline'}
                  disabled
                  className="w-full h-full py-6"
              >
                  B.DESIGN
              </Button>
              <Button
                  variant={'outline'}
                  disabled
                  className="w-full h-full py-6"
              >
                  Coming Soon...
              </Button>
          </div>
          <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="hidden lg:grid grid-cols-2 gap-2">
          <Btech>
              <Button
                  variant={'secondary'}
                  className="w-48 h-full"
              >
                  B.TECH
              </Button>
          </Btech>
          <Button
              variant={'outline'}
              disabled
              className="w-48 h-full"
          >
              BCA
          </Button>
          <Button
              variant={'outline'}
              disabled
              className="w-48 h-full"
          >
              BBA
          </Button>
          <Button
              variant={'outline'}
              disabled
              className="w-48 h-full"
          >
              B.COM
          </Button>
          <Button
              variant={'outline'}
              disabled
              className="w-48 h-full"
          >
              B.Ed
          </Button>
          <Button
              variant={'outline'}
              disabled
              className="w-48 h-full"
          >
              LLB
          </Button>
          <Button
              variant={'outline'}
              disabled
              className="w-48 h-full"
          >
              B.A
          </Button>
          <Button
              variant={'outline'}
              disabled
              className="w-48 h-full"
          >
              BHMCT
          </Button>
          <Button
              variant={'outline'}
              disabled
              className="w-48 h-full"
          >
              B.Voc
          </Button>
          <Button
              variant={'outline'}
              disabled
              className="w-48 h-full"
          >
              B.DESIGN
          </Button>
          <Button
              variant={'outline'}
              disabled
              className="w-48 h-full"
          >
              Coming Soon...
          </Button>
      </div>
  </div>
</LayoutWrapper>
}

export default CourseList